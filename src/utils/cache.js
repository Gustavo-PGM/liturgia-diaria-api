import { supabase } from '../config/supabase.js';


// procura a liturgia
export const obterCacheSupabase = async (dataHoje) => {
  const { data: cacheSalvo } = await supabase
    .from('cache_liturgia')
    .select('liturgia_json')
    .eq('data_referencia', dataHoje)
    .maybeSingle();
    
  return cacheSalvo ? cacheSalvo.resposta_json : null;
};


export const salvarCacheSupabase = async (dataHoje, jsonFormatado) => {
  await supabase
    .from('cache_liturgia')
    .insert([{ data_dia: dataHoje, resposta_json: jsonFormatado }]);
};