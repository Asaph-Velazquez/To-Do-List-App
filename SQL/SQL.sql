Create table Users(
	userId serial primary key,
	
	firstName varchar(50),
	lastName varchar(50),
	userName varchar(50) unique,
	userEmail varchar(50) unique,
	userPassword varchar(50)
);

create table Tasks(
	taskID serial primary key,
	userId int not null,
	
	taskName varchar(50),
	taskDescription text,
	taskDate date,
	taskPriority varchar(50),
	taskStatus varchar(50),
	taskCategory varchar(50),
	taskAttachments text,

	foreign key (userId) references Users(userId)
);

create table Administrators(
	adminId serial primary key,
	
	adminName varchar(50) unique,
	adminEmail varchar(50) unique,
	adminPassword varchar(50)	
);