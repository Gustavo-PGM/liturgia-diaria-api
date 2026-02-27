// converte números normais em números elevados para ficar igual na biblia
export const converterParaVersiculo = (textoComNumero) => {
  const numerosPequenos = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  return textoComNumero.split('').map(unidade => numerosPequenos[unidade] || unidade).join('');
};
