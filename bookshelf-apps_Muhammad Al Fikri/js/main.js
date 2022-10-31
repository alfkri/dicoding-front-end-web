const books = [];
const RENDER_EVENT = 'render-books';

/**Render Content*/
document.addEventListener('DOMContentLoaded', function () {
  if (isStorageExist()) {
    loadDataFromStorage();
  } 
  
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    addBook();
  });

  const findBookForm = document.getElementById('searchBook');
  findBookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    searchBook();
  });
});

/**Render data buku*/
document.addEventListener(RENDER_EVENT, function () {

  // List buku notreaded
  const notReadedBooksList = document.getElementById('incompleteBookshelfList');
  notReadedBooksList.innerHTML = '';

  // List buku readed
  const readedBooksList = document.getElementById('completeBookshelfList');
  readedBooksList.innerHTML = '';


  for (const bookItem of books) {
    const bookElement = makeBookItem(bookItem);
    if (!bookItem.isCompleted) {
      notReadedBooksList.append(bookElement);
    }
    else{
      readedBooksList.append(bookElement);
    }
  }

});


/**APPS FEATURES*/

// Tambah data buku
function addBook() {
  const bookTitle = document.getElementById('inputBookTitle').value;
  const bookAuthor = document.getElementById('inputBookAuthor').value;
  const bookYear = document.getElementById('inputBookYear').value;
  const bookIsReaded = document.getElementById('inputBookIsCompleted');
  let bookIsChecked;
  if (bookIsReaded.checked) {
    bookIsChecked = true;
  } else {
    bookIsChecked = false;
  }

  const generatedID = generateId();
  const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, bookIsChecked);
  books.push(bookObject);
 
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Generate id untuk data buku
function generateId() {
  return +new Date();
}

// Generate object data buku
function generateBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted
  }
}

// Cari id data buku
function findBookID(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

// Cari index data buku
function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

// Hapus data buku
function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);
 
  if (bookTarget === -1) return;
    
  if(window.confirm('Yakin mau dihapus?')){
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
  }else{
    return false;
  }

}



// Tambah data buku ke readedbook
function addReadedBook(bookId) {
  const bookTarget = findBookID(bookId);
  
  if (bookTarget == null) return;
  bookTarget.isCompleted = true;    

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}


// Tambah data buku ke notreadedbook
function addNotReadedBook(bookId) {
  const bookTarget = findBookID(bookId);
 
  if (bookTarget == null) return;
 
  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// Cari judul buku
function searchBook(){
  const titleInput = document.getElementById('searchBookTitle').value.toUpperCase();
  const bookList = document.getElementsByClassName('book_item');

  for (let item = 0; item < bookList.length; item++) {
    const itemOnList = bookList[item].querySelector('.title-book');
    if (itemOnList.textContent.toUpperCase().includes(titleInput)) {
      bookList[item].classList.remove('hidden');
    } else {
      bookList[item].classList.add('hidden');
    }
  }

}


/**DOM CREATE ELEMENT */

// Buat elemen data buku
function makeBookItem(bookObject) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = `Judul: ` +bookObject.title;
  textTitle.classList.add('title-book');
  
  const textAuthor = document.createElement('p');
  textAuthor.innerText = `Penulis: ` + bookObject.author;
  textAuthor.classList.add('author-book');
  
  const textYear = document.createElement('p');
  textYear.innerText = `Tahun Terbit: ` + bookObject.year;
  textAuthor.classList.add('year-book');

  const textContainer = document.createElement('div');
  textContainer.classList.add('book_content');
  textContainer.append(textTitle, textAuthor, textYear);
  
  const articleContainer = document.createElement('article');
  articleContainer.classList.add('book_item');
  articleContainer.append(textContainer);
  articleContainer.setAttribute('id', `book-${bookObject.id}`);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('action');


  if (!bookObject.isCompleted) {
    const doneButton = document.createElement('button');
    doneButton.classList.add('check');
 
    doneButton.addEventListener('click', function () {
      addReadedBook(bookObject.id);
    });
 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('trash');

    deleteButton.addEventListener('click', function () {
      removeBook(bookObject.id);
    });

    buttonContainer.append(doneButton,deleteButton);
    articleContainer.append(textContainer, buttonContainer);

  } else {
    const notDoneButton = document.createElement('button');
    notDoneButton.classList.add('undo');
    
    notDoneButton.addEventListener('click', function () {
      addNotReadedBook(bookObject.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('trash');
 
    deleteButton.addEventListener('click', function () {
      removeBook(bookObject.id);
    });

    buttonContainer.append(notDoneButton,deleteButton);
    articleContainer.append(textContainer ,buttonContainer);
  }
 
  return articleContainer;
}



/**WEB STORAGE */
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';


// Cek apakah support web storage  
function isStorageExist(){
  if (typeof (Storage) === undefined) {
    alert('Local Storage tidak support pada browser ini');
    return false;
  }
  return true;
}

// Simpan data ke storage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

// Ambil data dari storage
function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);
 
  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

// Pesan alert
document.addEventListener(SAVED_EVENT, function () {
  alert('Proses Berhasil!');
});

