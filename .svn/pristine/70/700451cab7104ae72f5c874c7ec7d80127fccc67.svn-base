export default {
    formatNum: function(num){
      if(num!== '' && num!== null && num!== NaN){
        // string转float
        var a = parseFloat(num);
        // 保留两位小数
        var n = a.toFixed(2);
        // 三位数一个逗号
        var str = Number(n).toLocaleString();
        // 对结尾是零的处理
        if(str.indexOf(".") == -1) {
          return str + ".00";
        } else if(str.indexOf(".") == str.length - 1) {
          return str + "00";
        } else if(str.indexOf(".") == str.length - 2) {
          return str + "0";
        } else {
          return str;
        }
      }
    },
    periodFormat(num){
      num=num.toString()
      return num.slice(0,4)+'年第'+ (num.slice(4,5)==0?num.slice(5,6):num.slice(4,6))+'期'
    }
}
