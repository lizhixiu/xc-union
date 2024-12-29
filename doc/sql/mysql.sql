
CREATE DATABASE xc_union CHARACTER SET utf8mb4;

use xc_union;


create table `magic_api_file` (
    `file_path` varchar(512) not null,
    `file_content` mediumtext,
    primary key (`file_path`)
) engine=innodb default charset=utf8mb4;


create table `magic_api_backup` (
    `id` varchar(32) not null comment '原对象id',
    `create_date` bigint(13) not null comment '备份时间',
    `tag` varchar(32) default null comment '标签',
    `type` varchar(32) default null comment '类型',
    `name` varchar(64) default null comment '原名称',
    `content` blob comment '备份内容',
    `create_by` varchar(64) default null comment '操作人',
    primary key (`id`, `create_date`)
) engine=innodb default charset=utf8mb4;