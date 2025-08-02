// thằng middileware có ba tham số
const delay = (req, res, next) => {
    // can thiệp vào request
    // if (url ===login) next
    setTimeout(()=>{
        if(req.headers.authorization){
        // lôi bearer token từ front end dề
        const token = req.headers.authorization.split(' ')[1];
        console.log("check token >>", token)
        }
        next()

    }, 3000)


}
module.exports = delay;
