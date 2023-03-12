class Utilities {
  static ext(name){
      var m = name.match(/\.([^.]+)$/)
      return m && m[1]
    }
}

export default new Utilities();