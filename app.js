let url = "http://universities.hipolabs.com/search?country=india";

let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let state = document.querySelector("input").value.toLowerCase();
    console.log("Searching for colleges in:", state);
    
    let colleges = await getColleges();
    let filteredColleges = filterByState(colleges, state);
    show(filteredColleges);
});

function filterByState(colleges, state) {
    return colleges.filter(college => {
        // Some colleges have state info in name or state-province field
        return (college.name.toLowerCase().includes(state) || 
                (college["state-province"] && 
                 college["state-province"].toLowerCase().includes(state)));
    });
}

function show(colArr) {
    let list = document.querySelector("#list");
    list.innerHTML = "";
    
    if (colArr.length === 0) {
        let li = document.createElement("li");
        li.innerText = "No colleges found for this state";
        list.appendChild(li);
        return;
    }

    for(let col of colArr) {
        let li = document.createElement("li");
        li.innerText = `${col.name} (${col["state-province"] || "State not specified"})`;
        list.appendChild(li);
    }
}

async function getColleges() {
    try {
        let res = await axios.get(url);
        return res.data;
    }
    catch(err) {
        console.log("ERROR:", err);
        return [];
    }
}
