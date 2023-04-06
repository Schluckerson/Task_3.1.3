insert into users.roles (name) value ("ROLE_ADMIN");
insert into users.roles (name) value ("ROLE_USER");

insert into users.users (last_name, name, password, username) values ("lastname1", "name1", "$2a$12$pCLY54BKJHktM2jBX9Jv4erX4sJ2THNBgcswaux7BuyQLHy7DU7Wy", "admin");
insert into users.users (last_name, name, password, username) values ("lastname2", "name2", "$2a$12$pCLY54BKJHktM2jBX9Jv4erX4sJ2THNBgcswaux7BuyQLHy7DU7Wy", "user");

insert into users.users_roles (user_id, role_id) values (1, 1);
insert into users.users_roles (user_id, role_id) values (1, 2);
insert into users.users_roles (user_id, role_id) values (2, 2);
