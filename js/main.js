function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }


    pressed.clear();

    func();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });

}

runOnKeys(
  () => window.location.replace("Admin.html"),
  "KeyF",

);


function SortStrategy(){}

SortStrategy.prototype.sort = function (){};

function NameSort(){}
NameSort.prototype = Object.create(SortStrategy.prototype);
NameSort.prototype.sort = function(data){
  data.sort(function (a,b){
    return (a.name > b.name) ? 1 : -1;
  });
};

function PriceSort(){}
PriceSort.prototype = Object.create(SortStrategy.prototype);
PriceSort.prototype.sort = function(data){
  data.sort(function (a,b){
    return (a.lvl > b.lvl) ? 1 : -1;
  });
};

function SalarySort(){}
SalarySort.prototype = Object.create(SortStrategy.prototype);
SalarySort.prototype.sort = function(data){
  data.sort(function (a,b){
    return (a.salary > b.salary) ? 1 : -1;
  });
};

function PermSort(){}
PermSort.prototype = Object.create(SortStrategy.prototype);
PermSort.prototype.sort = function(data){
  data.sort(function (a,b){
    return (a.permission > b.permission) ? 1 : -1;
  });
};

let member = (function (){
  let strategy = {};
  let data = [
    {name: 'Менеджер', lvl: 2, permission: 'FullFil', salary: 40000},
    {name: 'Программист', lvl: 5, permission: 'Full', salary: 160000},
    {name: 'Редактор', lvl: 3, permission: 'FullSet', salary: 120000},
    {name: 'Бухгалтер', lvl: 1, permission: 'SetFil', salary: 20000},
    {name: 'Директор', lvl: 4, permission: 'Full', salary: 100000},
    {name: 'Инженер', lvl: 3, permission: 'FullSet', salary: 75000},
    {name: 'Клиент', lvl: 0, permission: 'None', salary: 0}
  ];

  //Enter list//
  function printList(){
    $('.Member_list').empty();
    data.forEach(function(product){
      $('.Member_list').append(
        $('<li></li>').text(product.name + ',  ' + product.lvl + ',  ' + product.permission + ',  ' + product.salary)
      );
    });
  }
  printList();

  return {
    sort:function(){
     strategy.sort(data);
     printList();
    },
    setStrategy:function(s){
      strategy = s;
    }
  };
}());

$('.Member_sort-type').change(function (){
  let val = $(this).val();
  if(val === 'name') member.setStrategy(new NameSort());
  else if(val === 'lvl') member.setStrategy(new PriceSort());
  else if(val === 'salary') member.setStrategy(new SalarySort());
  else if(val === 'permission') member.setStrategy(new PermSort());
});
$('.Member_exec-sort').click(function (){
  member.sort();
});
