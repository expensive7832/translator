const option = {
    method: "GET",
    headers: {
		'X-RapidAPI-Key': '1b73e796c3msh8a55e1c908f94b8p10eb8ajsnf5936fc1f32c',
		'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
	}
}

function getLang(data){
    var opt = document.createElement("option") // <option></option>
    opt.setAttribute("value", data[1]) // <option value=""></option>
    opt.innerText = data[0] // <option value=""> en </option>
    document.getElementById("lang").append(opt)
}

window.load = fetch('https://translate-plus.p.rapidapi.com/', option)
.then((result) => result.json())
.then((result) => {
    Object.entries(result.supported_languages).slice(1,).forEach((lng) => getLang(lng))
})


document.getElementById("btn").onclick = function(){
    var text = document.getElementById("search").value
    var lng = document.getElementById("lang").value

   

    if(text === ""){
        alert("Your search is empty")
    }else{
        const option = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '1b73e796c3msh8a55e1c908f94b8p10eb8ajsnf5936fc1f32c',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            body: `{"text": ${JSON.stringify(text)}}`
        }

        fetch('https://translate-plus.p.rapidapi.com/language_detect', option)
        .then(response => response.json())
        .then(response => {
           var detectLng = response.language_detection.language
           const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '1b73e796c3msh8a55e1c908f94b8p10eb8ajsnf5936fc1f32c',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            body: `{"text":${JSON.stringify(text)},"source":${JSON.stringify(detectLng)},"target":${JSON.stringify(lng)}}`
        };
        
        fetch('https://translate-plus.p.rapidapi.com/translate', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        })
        .catch(err => console.error(err));
    }


    

    
}


