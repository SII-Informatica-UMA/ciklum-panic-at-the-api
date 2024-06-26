create sequence sesion_seq start with 1 increment by 50;
create table sesion (presencial boolean, fin timestamp(6) not null, id_plan bigint, id_sesion bigint not null, inicio timestamp(6) not null, descripcion varchar(255), trabajo_realizado varchar(255), primary key (id_sesion));
create table sesiondto_datos_salud (sesiondto_id_sesion bigint not null, datos_salud varchar(255));
create table sesiondto_multimedia (sesiondto_id_sesion bigint not null, multimedia varchar(255));
alter table if exists sesiondto_datos_salud add constraint FK_datosSesion_idSesion foreign key (sesiondto_id_sesion) references sesion;
alter table if exists sesiondto_multimedia add constraint FK_multimedia_idSesion foreign key (sesiondto_id_sesion) references sesion;
