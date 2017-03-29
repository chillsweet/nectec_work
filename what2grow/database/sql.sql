select * from nat_place where pla_code IN (select pla_parent from nat_place where pla_code IN (select pla_parent from nat_place where pla_longitude = 100.597 and  pla_latitude = 13.593));
