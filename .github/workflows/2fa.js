// 2FA Authentication Module
// Generates and validates 2FA codes

function generate2FASecret() {
    // Generate a random secret key (32 chars)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secret = '';
    for (let i = 0; i < 32; i++) {
        secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
}

function generateVerificationCode(secret) {
    // Generate a 6-digit code based on secret and current time
    const time = Math.floor(Date.now() / 30000); // 30-second window
    const combined = secret + time;
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    const code = Math.abs(hash) % 1000000;
    return String(code).padStart(6, '0');
}

function verify2FACode(secret, code) {
    // Verify code with 30-second window tolerance (previous, current, and next)
    const currentTime = Math.floor(Date.now() / 30000);
    
    // Check previous, current, and next time windows
    for (let i = -1; i <= 1; i++) {
        const time = currentTime + i;
        const combined = secret + time;
        
        // Same hash as above
        let hash = 0;
        for (let j = 0; j < combined.length; j++) {
            const char = combined.charCodeAt(j);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        const validCode = Math.abs(hash) % 1000000;
        const validCodeStr = String(validCode).padStart(6, '0');
        
        if (validCodeStr === String(code).padStart(6, '0')) {
            return true;
        }
    }
    return false;
}

function generate2FABackupCodes(count = 10) {
    // Generate backup codes (8-character alphanumeric)
    const codes = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    for (let i = 0; i < count; i++) {
        let code = '';
        for (let j = 0; j < 8; j++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        codes.push(code);
    }
    return codes;
}

function is2FAEnabled() {
    return localStorage.getItem('2fa_enabled') === 'true';
}

function enable2FA(secret, backupCodes) {
    localStorage.setItem('2fa_enabled', 'true');
    localStorage.setItem('2fa_secret', secret);
    localStorage.setItem('2fa_backup_codes', JSON.stringify(backupCodes));
}

function disable2FA() {
    localStorage.removeItem('2fa_enabled');
    localStorage.removeItem('2fa_secret');
    localStorage.removeItem('2fa_backup_codes');
}

function get2FASecret() {
    return localStorage.getItem('2fa_secret');
}

function use2FABackupCode(code) {
    const codes = JSON.parse(localStorage.getItem('2fa_backup_codes') || '[]');
    const index = codes.indexOf(code.toUpperCase());
    if (index > -1) {
        codes.splice(index, 1);
        localStorage.setItem('2fa_backup_codes', JSON.stringify(codes));
        return true;
    }
    return false;
}
