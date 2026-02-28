export const converterParaVersiculo = (texto) => {
  const nP = {'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};
  // O \s* tira qualquer espaço que venha depois do número, para assim ficar grudado e melhor
  return texto.replace(/(\d+)\s*/g, (m, n) => n.split('').map(u => nP[u]).join(''));
};
