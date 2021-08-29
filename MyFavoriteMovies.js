const movies = [{
  title: 'The Avengers',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15305/TheAvengersPoster.jpg',
  rating: 0
},
{
  title: 'Our Times',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15304/OurtimesPoster.jpeg',
  rating: 0
},
{
  title: 'Aquaman',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15303/AquamanPoster.jpg',
  rating: 0
}]

//抓取local storage的最新list
let updatedRatingList = JSON.parse(localStorage.getItem('movies'))
//如果local storage沒有list或是list全部被刪掉，把現有的movie存到local storage
if (!updatedRatingList || !updatedRatingList.length) {
  localStorage.setItem('movies', JSON.stringify(movies))
}
updatedRatingList = JSON.parse(localStorage.getItem('movies'))


function createTableAndHeader() {
  // create table
  const table = document.createElement('table')
  table.className = 'table'

  // create header
  const row = document.createElement('tr')
  table.appendChild(row)

  const header = ['Image', 'Title', 'Ratings']
  for (let i = 0; i < header.length + 1; i++) {
    const cell = document.createElement('th')
    row.appendChild(cell)
    cell.innerHTML = header[i]

    if (header[i] === undefined) {
      cell.innerHTML = ''
    }
  }
  return table
}

function addRow(data) {
  // create first row from first movie data
  const row = document.createElement('tr')

  // append data to cell
  row.appendChild(document.createElement('td')).innerHTML = `<img src = ${data.image} width = "70" class="img-thumbnail" >`
  row.appendChild(document.createElement('td')).innerHTML = data.title
  row.appendChild(document.createElement('td')).innerHTML = `
  <div class="rating">
    <span>${data.rating}</span>
    <i class="fas fa-thumbs-up"></i>
    <i class="fas fa-thumbs-down"></i>
  </div>
  `
  row.appendChild(document.createElement('td')).innerHTML = '<div class="remove">X</div>'

  return row
}

// //////////////////////////////////////
// select element from html template
const dataPanel = document.querySelector('#data-panel')

// append html content to data panel
const table = createTableAndHeader()
dataPanel.appendChild(table)

// display movie list
for (let i = 0; i < updatedRatingList.length; i++) {
  table.appendChild(addRow(updatedRatingList[i]))
}

//add EventListener
dataPanel.addEventListener('click', dataPanelOnClicked)
function dataPanelOnClicked(event) {
  const target = event.target
  //只有點擊到class含有thumbs字元時會被觸發
  if (target.matches("[class*='thumbs']")) {
    const ratingBox = target.parentElement.children[0]
    let rating = +ratingBox.innerHTML
    //點擊到拇指向上按鈕 rating+1
    //點擊到拇指向下按鈕 且rating值大於0時 rating-1
    target.matches("[class*='up']") ? rating += 1 :
      target.matches("[class*='down']") && rating > 0 ? rating -= 1 :
        alert('NO MOVIE THAT BAD')
    //render新的rating值
    ratingBox.innerHTML = rating
    //找到被點擊電影的index
    const index = updatedRatingList.findIndex(movie => {
      return movie.title === target.parentElement.parentElement.parentElement.children[1].innerHTML
    })
    //更新updatedRatingList裡的rating值，並存入local storage
    updatedRatingList[index].rating = rating
    localStorage.setItem('movies', JSON.stringify(updatedRatingList))
  }
  //從updatedRatingList裡刪除被點擊的電影，並存入local storage
  if (target.matches('.remove')) {
    target.parentElement.parentElement.remove()
    updatedRatingList = JSON.parse(localStorage.getItem('movies'))
    const index = updatedRatingList.findIndex(movie => {
      return movie.title === target.parentElement.parentElement.children[1].innerHTML
    })
    updatedRatingList.splice(index, 1)
    localStorage.setItem('movies', JSON.stringify(updatedRatingList))
  }
}

