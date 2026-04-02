let numbers = 
{
    start : 1,
    end : 5,
    *[Symbol.iterator](){
        for( let i = this.start;i <= this.end;i++)
        {
            yield i;
        }
    }
};
for( let num of numbers)
{
    console.log(num);
}