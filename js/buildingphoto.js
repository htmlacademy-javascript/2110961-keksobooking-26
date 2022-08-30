
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.ad-form__upload input[type=file]');
const preview = document.querySelector('.ad-form__photo');


fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const roomPhoto = document.createElement('img');
    roomPhoto.setAttribute('src', 'images/hydrangeas.jpg');
    preview.appendChild(roomPhoto);
    roomPhoto.src = URL.createObjectURL(file);
  }
});
