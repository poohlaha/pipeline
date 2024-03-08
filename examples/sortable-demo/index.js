window.onload = () => {
  var nestedSortables = document.querySelectorAll('.nested-sortable')
  for (var i = 0; i < nestedSortables.length; i++) {
    new Sortable(nestedSortables[i], {
      group: 'nested',
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.65,
    })
  }

  var sortableList = document.querySelectorAll('.list-sortable-list')
  for (var i = 0; i < sortableList.length; i++) {
    new Sortable(sortableList[i], {
      group: 'nested',
      // animation: 150,
      ghostClass: '',
      fallbackOnBody: true,
      swapThreshold: 0.65,
    })
  }

  var sortables = document.querySelectorAll('.list-sortable')
  for (var i = 0; i < sortables.length; i++) {
    new Sortable(sortables[i], {
      group: 'nested',
      // ghostClass: '',
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.65,
    })
  }
}
