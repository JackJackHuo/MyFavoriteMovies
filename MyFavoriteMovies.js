// 資料
let movies = [{
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
  

  let listContent = document.querySelector("#tbody")
  
  function displayMovieList (movies) {
    let movieHTML = ""
    for (let i = 0; i < movies.length; i++) {
        movieHTML += `
        <tr>
              <td>
                <img src = ${movies[i].image} width = "70" class="img-thumbnail" >
              </td>
              <td>${movies[i].title}</td>
              <td>
                <span class="fa fa-thumbs-up"></span>
                <span class="fa fa-thumbs-down px-2"></span>
                <span>${movies[i].rating}</span>
              </td>
              <td>
                <button class="btn btn-sm btn-danger">X</button>
              </td>
            </tr>
        `
      }
    return movieHTML
  }
  
listContent.innerHTML = displayMovieList(movies)


