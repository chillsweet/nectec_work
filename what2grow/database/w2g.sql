

CREATE TABLE type_content (
  ty_con_id INT(4) NOT NULL AUTO_INCREMENT,
  ty_con_name VARCHAR(100) NOT NULL ,
   PRIMARY KEY(ty_con_id)
);

CREATE TABLE content (
  con_id INT(4) NOT NULL AUTO_INCREMENT,
  con_name VARCHAR(100) NOT NULL,
  con_description TEXT NOT NULL,
  con_part VARCHAR(255) NOT NULL,
  con_ty_id INT(4) NOT NULL,
  con_id_sev INT(4) NOT NULL,
  con_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(con_id),
  FOREIGN KEY(con_ty_id) REFERENCES type_content(ty_con_id)
);
