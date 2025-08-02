export async function  login(email, password) {
    const res = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
         method: 'POST',
         headers: { 'Content-Type':'application/json'},
         body:JSON.stringify({email, password})

    });

    if (!res.ok){
        const errorData = await res.json();
        throw new Error(errorData.message || "Đăng nhập thất bại")

    }
    return res.json();
    
}

export async function getProfile(accessToken){

    const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
         method: 'GET',
         headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type':'application/json',
         }
         
    });
    if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Lấy thông tin user thất bại")
    }
     return res.json();
}