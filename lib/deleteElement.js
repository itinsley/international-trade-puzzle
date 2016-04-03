module.exports = function deleteElement(array, element){
  index = array.indexOf(element);
  array.splice(index, 1);
}

