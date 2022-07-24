create database todolist;
create table tasks (
    id int auto_increment,
    title varchar(50) not null,
    descripcion varchar(300) not null,
    fecha date not null,
    active boolean default 1,
    finished boolean default 0,
    primary key(id)
);
-- {
--     "id": ,
--     "title":,
--     "descripcion":,
--     "fecha":,
-- }
