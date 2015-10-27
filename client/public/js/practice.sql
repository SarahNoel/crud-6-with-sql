select drinks.name, orders.at
  from items inner join drinks
    on items.drinkid = drinks.drinkid

    inner join orders
    on items.orderid = orders.orderid
  order by orders.at;



select customers.name, sum(items.quantity) total from items

  inner join drinks
    on items.drinkid = drinks.drinkid

  inner join orders
    on orders.orderid = items.orderid

  inner join customers
    on orders.customerid = customers.customerid

  group by customers.name;



select customers.name, sum(items.quantity) as "drinks ordered" from items

  inner join drinks
    on items.drinkid = drinks.drinkid

  inner join orders
    on orders.orderid = items.orderid

  inner join customers
    on orders.customerid = customers.customerid

  group by customers.name;
