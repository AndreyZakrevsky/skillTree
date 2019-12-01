let mapFieldsBack = {
  description: 'descr',
  isInvisible: 'invisible',
  starCount: 'level',
}

let convertTreeFromApi = node => {
  node.props = {
    pos: {x:300 + node.id*10 , y:300 + node.id*10 }
  }

  for(let k in node) {
    if (k == 'subBadges' || k == 'props') continue
    node.props[k] = node[k]
    delete node[k]
  }

  node.props = renameFields(node.props, mapFieldsBack)

  if (node.subBadges) {
    node.subBadges.forEach(child => convertTreeFromApi(child))
    node.children = node.subBadges
    delete node.subBadges
  }

  if (node.props.requiredBadges) {
    node.props.requiredBadges.forEach(child => convertTreeFromApi(child))
  }

  return node
}

let flatArray = tree => {
  let flat = {}

  let nextLevel = (node, parentNode = null) => {
    flat[node.props.id] = node

    if (node.children) {
      node.children.forEach(child => nextLevel(child, node))
    }
  }
  nextLevel(tree)

  return flat
}

let addCoordinates = (tree, mockMapTree) => {
  let flatMock = flatArray(mockMapTree)

  let nextLevel = node => {
    let mockNode = flatMock[node.props.id]
    if (mockNode) {
      node.props.pos = mockNode.props.pos
    }

    if (node.children) {
      node.children.forEach(child => nextLevel(child))
    }
  }
  nextLevel(tree)

  return tree
}

let renameFields = (fields, map) => {
  let fieldsOut = {}

  for (let k in fields) {
    if (map[k]) {
      fieldsOut[map[k]] = fields[k]
    } else {
      fieldsOut[k] = fields[k]
    }
  }
  return fieldsOut
}

export default {
  convertTreeFromApi,
  flatArray,
  addCoordinates,
  renameFields
}
