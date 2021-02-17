console.log('2015')
// 闭包就是通过函数作用域去摆脱全局作用域对函数的影响
//let没有变量提升 先声明再使用

// 不用var 使用const和let结合使用，提高效率

//数组解构
let arr = ['a','b','c','d']
let [,,g,f] = [...arr]
let [a,c,d,e,m] = [...arr,'d']
console.log(g,f,[...arr],m)

//对象解构
const obj = {name:'zce', age:18}
//默认值
const {name:objs='jsce',value} = obj;
console.log(objs,value)

//模板字符串
// 支持多行 插值表达式
const namename = 'tom';
const msg = `hey, ${namename}`
console.log(msg)

//模板字符串带标签
const gender=`hhhelloworld`;
console.log(gender);

const gname = true;

function myTagFunc(strings,gname,gender){
    console.log(strings)
    return strings[0]+gname+strings[1]+gender;
}
//将表达式静态分隔
// [ 'hey, ', ' is a ', '' ]
const result = myTagFunc`hey, ${gname} is a ${gender}`
console.log(result)

//includes endWith startWith  字符串
let str = "hello Wiold"
console.log(str.includes('o'))

console.log(str.endsWith('d'))

console.log(str.startsWith('h'))

//设参数默认值

function foo(enable){
    enable = enable||true;
    enable = enable === undefined ? true:false;
}
//默认参数
function foo(h , enable=true){
    // enable = enable === undefined ? true:false;
}

//...剩余参数
function fun(a,b,...args){
    console.log(args)
}
fun(1,2,3,4);

const arrFun = ['foo', 'bar', 'baz']
//自动将每一个数组展开
foo(...arrFun)

//箭头函数不会改变this指向

//对象字面量增强
let obj1={
    foo:'123',
    [Math.random()]:123456
};
obj1[Math.random()]=123456
console.log(obj1)

let tag={}

//浅复制  目标对象 赋值对象
Object.assign(tag,obj1)
console.log('tag',tag)

//Object.is
console.log(
    Object.is(NaN,NaN),
    Object.is(+0,-0)
)

//-------------------------------------
const person = {
    name:'zce', 
    age:28
}

// Object.defineProperty 只能监视到对象读取
// Object.defineProperty('person',{
//     writable:false,
//     set(value){

//     },
//     get(value){

//     }
// })


// Proxy 代理门卫 能监视到删除以及一些其他的方法
const personProxy = new Proxy(person,{
    get(target,property){
        // 判断当前对象是否存在这样一个属性
        return property in target ? target[property]:'default';
        // console.log(target,property)
        // return 100;
    },
    set(target,property,value){
        //可以设置校验
        if(property === 'age'){
            if(!Number.isInteger(value)){
                throw  new TypeError(`${value} is not an int`)
            }
        }
        return target[property]=value;
    },
    deleteProperty(target,property){
        console.log('delete',property)
        delete target[property];
    }

})
// personProxy.age = 100;
// console.log(personProxy.name);
// console.log(personProxy.xxx);

delete personProxy.age;
console.log(person);

// 对于数组对象的监视  使用object.definPrototy  
//对于数组方法进行重写
const list = [];
const listProxy = new Proxy(list,{
    set(target,property,value){
        console.log('set',property,value)
        target[property] = value;
        return true; //表示设置成功
    }
})
//没有对对象进行破坏
listProxy.push(1480)

//reflect 是一个静态类
// 内部封装了一些对对象的底层操作
//Reflect 是对proxy的一系列默认实现

const objz = {
    foo:'123',
    bar:'456'
}
const proxy = new Proxy(objz,{
    get(target,property){
        return Reflect.get(target,property)
    }
})

console.log(proxy.foo)
console.log(Object.keys(objz))
console.log(Object.values(objz))

class Person{
    constructor(name){
        //对象内在逻辑
        this.name=name
    }
    say(){
        console.log(`${this.name}`)
    }
    static create(name){
        return new Person(name)
    }
}
// let aa = new Person("huhu");

//静态方法内部，对象不会指向某个实例，而是类型
let aa = Person.create("huhu");
aa.say()

//实例方法 根据类型构造实例对象去调用
//静态方法 根据类型本身去调用

//类继承