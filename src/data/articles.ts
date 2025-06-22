export async function fetchArticles() {
  const url = 'https://docs.google.com/spreadsheets/d/1m8wv7sK_H8xaaELnmldJ5jNywu_YQpWIE3bT7EPYtIk/gviz/tq?gid=1451098141&headers=1';
  const res = await fetch(url);
  const text = await res.text();
  const jsonMatch = text.match(/setResponse\(([\s\S]*)\);/);
  const data = JSON.parse(jsonMatch[1]);
  const cols = data.table.cols.map((c: any) => c.label);
  const rows = data.table.rows.map((r: any) => {
    const obj: Record<string,string> = {};
    r.c.forEach((cell: any, i: number) => {
      obj[cols[i]] = cell && cell.v != null ? String(cell.v) : '';
    });
    return obj;
  });
  return rows.map(row => ({
    title:   row['Название'].trim(),
    link:    row['Ссылка на источник'].trim(),
    summary: row['Резюме'].trim(),
    tags:    row['Теги']
                .split(',')
                .map(t => t.trim())
                .filter(t => t),
    pdf:     (row['PDF']||'').trim()
  }));
}

