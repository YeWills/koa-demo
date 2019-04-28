function ajax({url,type,isFile}){
    return fetch(url)
      .then(response => {
        if(isFile){
            return response.blob();
        }
        return response.json();
      }).catch(err=>{
          console.log(err)
      })
}

function clickF(){
    console.log(res)
    window.location.href ='/getFile';
}
function download(){
    console.log(res)
    window.location.href ='/getFile';
}

function clickImg(){
    ajax({url:'/getImg',isFile:true}).then(res=>{
        var blob = res;
        console.log(res)
        // 方式一
        // var reader = new FileReader();
        // var image = document.querySelector('#img');
        // reader.onload = function (event) {
        //   image.src = event.target.result;
        // };
        // reader.readAsDataURL(blob);

         // 方式二
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(blob);
        var image = document.querySelector('#img');
        image.src = imageUrl;
    })
}

