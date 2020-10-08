const arr = [
    {
      _id: "5f7b8e4177166b07786ab5ef",
      number: '9',
      date: '2020-10-05T21:21:05.522Z'
    },
    {
      _id: "5f7b8f753991a706f03b6ff9",
      number: '9',
      date: '2020-10-05T21:26:13.685Z'
    },
    {
      _id: "5f7b8f763991a706f03b6ffb",
      number: '9',
      date: '2020-10-06T21:26:14.627Z'
    },
    {
      _id: "5f7b8f7a3991a706f03b6ffd",
      number: '6',
      date: '2020-10-06T21:26:18.302Z'
    },
    {
      _id: "5f7b8f7b3991a706f03b6fff",
      number: '6',
      date: '2020-10-05T21:26:19.938Z'
    }
  ];
  const datenow = { date: '2020-10-05' };
  
const result = [];
const slicingDate = arr.filter((item) => {
    let a = item.date.slice(0,10);
    return item.date = a;
}).filter(item => item.date === datenow.date);




// .map((item) => {
//     console.log(arr);


//     slicingDate.push(arr[item.date] == datenow.date)
// })
console.log(arr);
console.log(slicingDate);