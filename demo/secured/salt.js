async function hash(secret) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(secret));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function handleSubmit(event) {
    event.preventDefault();

    const password = document.getElementById('password');
    const phash = document.getElementById('phash');

    fetch('/salt.php').then(response => response.text()).then(salt => {
        hash(password.value).then((hashedPassword) => {
            hash(hashedPassword + salt).then((saltedPassword) => {
                phash.value = saltedPassword;
                password.value='';
                event.target.submit();
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginform');
    loginForm.addEventListener('submit', handleSubmit);
});