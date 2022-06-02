

// Fetch URL-------->

const api_key = "AIzaSyCPrnfkoAMVUSmqMqzGhFMnY7zDtbdEdw4"

//const url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResult=[YOUR_API_KEY]' 

let search = async () =>{
    try{
    let query = document.getElementById("query").value;
    let url =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${api_key}`
    let res = await fetch(url);
    let data = await res.json();

    append(data.items)

    //console.log(data)
} catch (err){
    console.log(err)
}

}

// Append data to DOM------>

let append = (data) =>{
    let container = document.getElementById("results");
    container.innerHTML = null;
    //console.log(data)
    data.forEach(({id:{videoId},snippet:{title, thumbnails}}) => {
        //console.log(title)
        let img = document.createElement("img");
        img.src = thumbnails.default.url
        
        let div = document.createElement("div")
        let iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.allow = "fullscreen"
        
        let h3 = document.createElement("h3");
        h3.innerText = title;

        
        
        
        div.append(iframe,h3,img);
        
        div.onclick = () => {
            let video = {
                title,
                videoId,
            }
            playVideo(video);
        }

        container.append(div);

    });


};

let playVideo = (video) => {
   
    window.localStorage.setItem("video",JSON.stringify(video))
    window.location.href = "video.html"

}

/*<iframe width="560" height="315" 
src="https://www.youtube.com/embed/ernrLqLKqX8"----->Video ID
title="YouTube video player" 
frameborder="0" 
allow="accelerometer; 
autoplay; clipboard-write;
encrypted-media;gyroscope; 
picture-in-picture" allowfullscreen>
</iframe>
*/