d3.json("/news",function(err,data){
    if(err) throw err;
    console.log(data)
    // data.forEach(function(d){
    //     var dates = d.date;
    //     var titles = d.title

    // })
    let start = 0
        stop = 5
        page = 1
        pages_length = data.length/5
        total_results = data.length
        $displayNum1 = document.querySelector("#displayNum1")
        $displayNum2 = document.querySelector("#displayNum2")
        $displayNum3 = document.querySelector("#displayNum3")
        $nextBtn=document.querySelector(".next")
        $prevBtn=document.querySelector(".previous");
    var $article = document.getElementById("articles")
    
    function renderTable(start,stop){
        $article.innerHTML = "";
        for (var i = start, ii=stop;i<ii;i++){
            var $a = document.createElement("a");
            $a.append(`${data[i].date}: ${data[i].title}`)
            $a.href = data[i].url
            $a.target = "_blank"
            $article.appendChild($a)
            var $br = document.createElement("hr")
            $a.appendChild($br)
        }
    }
    renderTable(start,stop)
    

    $displayNum1.innerHTML = 1;
    $displayNum2.innerHTML = stop;
    $displayNum3.innerHTML = data.length;

    // Create event listeners for page clickers
    $nextBtn.addEventListener("click", function handleNext(event){
        event.preventDefault();
        if (page < pages_length){
            page += 1;
            start +=5;
            stop +=5;
            renderTable(start, stop);
            $displayNum1.innerHTML = start + 1;
            $displayNum2.innerHTML = stop;
        };  
    });
    $prevBtn.addEventListener("click", function handlePrev(event){
        event.preventDefault();
        if (page > 1){
            page -= 1;
            start -=5;
            stop -=5;
            renderTable(start, stop);
            $displayNum1.innerHTML = start + 1;
            $displayNum2.innerHTML = stop;
        };
    });
})


