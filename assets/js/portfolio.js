const imageContainerID = "portfolio_images";
const imageContainerElement = document.getElementById(imageContainerID);

window.onload = function () {
  addImagesToImageContainer(getAllImageData(), imageContainerElement, false);
  addImagesToCarousel();
  // removeCurrentActive();
};
window.onclick = (event) => isUserExitsModalByClickingOutsideTheModal(event);

function selectPortfolio(event) {
  const shownImageClass = event.srcElement.id;
  const isAllImageShown = shownImageClass === "all";

  const images = document.querySelectorAll(".portfolio__images img");
  for (let image of images) {
    if (isAllImageShown) {
      showImage(image);
      continue;
    }
    let imageClasses = image.className.split(" ");
    hideImage(image);
    if (imageClasses.includes(shownImageClass)) {
      showImage(image);
    }
  }
}

function hideImage(image) {
  image.classList.remove("show");
}

function showImage(image) {
  image.classList.add("show");
}

function addImagesToImageContainer(
  imageData,
  imageContainerElement,
  isInModal
) {
  for (let imgID of Object.keys(imageData)) {
    let imageElement = createImageElement(
      imgID,
      imageData[imgID].imgURL,
      imageData[imgID].imgClass,
      imageData[imgID].imgAltText,
      isInModal
    );
    imageContainerElement.appendChild(imageElement);
  }
}

function getAllImageData() {
  // this function is still hard-coded,
  // might be improved using fs.readdirSync to list image files in directory

  const imageData = {};
  const imgFolderPath = "/assets/img/works/";
  const numberOfFiles = 8;
  const imgAltText = [
    "phone",
    "tables",
    "aircraft wing",
    "cat",
    "candle",
    "eggs",
    "lemon water",
    "to do text",
  ];
  const imgClass = [
    "web_design",
    "mobile_app",
    "ui_design",
    "mobile_app",
    "web_design",
    "web_design",
    "ui_design",
    "mobile_app",
  ];

  for (let i = 0; i < numberOfFiles; i++) {
    let imgURL = `${imgFolderPath}${(i + 1).toString()}.jpg`;
    let imgID = `img-${i + 1}`;
    imageData[imgID] = {
      imgURL: imgURL,
      imgClass: imgClass[i],
      imgAltText: imgAltText[i],
    };
  }
  return imageData;
}

function createImageElement(imgID, imgURL, imgClass, imgAltText, isInModal) {
  const image = document.createElement("img");
  image.setAttribute("src", imgURL);
  image.setAttribute("id", imgID);
  image.setAttribute("class", `${imgClass} show`);
  image.setAttribute("alt", imgAltText);
  if (!isInModal) {
    image.setAttribute("data-bs-toggle", "modal");
    image.setAttribute("data-bs-target", "#imageModal");
    image.setAttribute("onclick", "openImageCarousel(event)");
  }
  return image;
}

function openImageCarousel(event) {
  let carouselImgID = `carousel-${event.target.id}`;
  setActiveImage(carouselImgID);
}

function addImagesToCarousel() {
  const carouselInnerElementTarget = document.getElementById(
    "carousel-inner-target"
  );

  const imagesData = getAllImageData();

  for (let imgID of Object.keys(imagesData)) {
    let carouselItemElement = document.createElement("div");
    carouselItemElement.setAttribute("class", "carousel-item");

    let tempImageDataObject = {};
    let carouselImgID = `carousel-${imgID}`;
    tempImageDataObject[carouselImgID] = imagesData[imgID];

    addImagesToImageContainer(tempImageDataObject, carouselItemElement, true);
    carouselInnerElementTarget.appendChild(carouselItemElement);
  }
}

function setActiveImage(carouselImgID) {
  let targetCarouselItemElement =
    document.getElementById(carouselImgID).parentElement;
  targetCarouselItemElement.classList.add("active");
}

function carouselControlButtonIsClicked(event) {}

function isUserExitsModalByClickingOutsideTheModal(event) {
  let isUserExitsModalByClickingOutsideTheModal =
    event.target.id == "imageModal";

  if (isUserExitsModalByClickingOutsideTheModal) {
    removeCurrentActive();
  }
}
function removeCurrentActive() {
  let activeCarousel = document.getElementsByClassName(
    "carousel-item active"
  )[0];
  activeCarousel.classList.remove("active");
}
