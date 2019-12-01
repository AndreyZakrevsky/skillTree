let arrayToObject = array =>
  array.reduce((obj, item) => {
    obj[item.key] = item.value
    return obj
  }, {})

export default (source, fieldNames) => {
  let arrayFields = fieldNames.map(fieldName => ({
    key: fieldName,
    value: {
      get() {
        return this[source][fieldName]
      },
      set(value) {
        this.$emit('update', {[fieldName]: value})
      }
    }
  }))

  return arrayToObject(arrayFields)
}
