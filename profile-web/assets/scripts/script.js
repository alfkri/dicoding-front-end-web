// Skills List
const skills_list = [
    {
        skill: "Machine Learning"
    },
    {
        skill: "Python"
    },
    {
        skill: "HTML"
    },
    {
        skill: "CSS"
    },
    {
        skill: "Javascript"
    }
]

for(let item = 0; item < skills_list.length; item++) {
    document.querySelector("#flex_container").innerHTML += 
    `
        <p class="item">${skills_list[item].skill}</p>
    `;
}