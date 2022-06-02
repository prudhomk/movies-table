const list = document.getElementById('list');

async function fetchData() {
  const res = await fetch('http://localhost:7890/movies/mc');
  const data = await res.json();

  data.forEach(m => {
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(JSON.stringify(m)));
    list.appendChild(listItem);
  });

  console.log(data);
  return data;
}

fetchData();
