drop table if exists requirements;
create table requirements (
  id integer primary key autoincrement,
  comment text,
  nfo_id integer,
  nfo_source text,
  library_id integer,
  status integer
);