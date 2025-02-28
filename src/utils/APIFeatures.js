export default class ApiFeatures{
  constructor(mongooseQuery,queryString){
    this.mongooseQuery=mongooseQuery;
    this.queryString=queryString;
  }
  //1-pagination:

  pagination(){
    let page=this.queryString.page*1 || 1;
    if(this.queryString.page <= 0) page=1
    let skip=(page-1)*4;
    this.page=page;
    this.mongooseQuery.skip(skip).limit(4)
    return this;
  }
  //2-filter:
  filter(){
    let filterObj={...this.queryString};
    let excludedQuery=['page','sort','keyword','fields']
    excludedQuery.forEach((q)=>{
      delete filterObj[q]
    })
    filterObj=JSON.stringify(filterObj);
    filterObj=filterObj.replace(/\bgt|gte|lt|lte\b/g,match => `$${match}`);
    filterObj=JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }
  // 3-Sort:
  sort(){
    if(this.queryString.sort){
      let sortBy= this.queryString.sort.split(",").join(" ")
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }
  //4-Search
  search(){
    if(this.queryString.keyword){
      this.mongooseQuery.find({
        $or:[
          {title:{$regex: this.queryString.keyword,$options:"i"}},
          {description:{$regex: this.queryString.keyword,$options:"i"}}
        ]
    });
    }
    return this;
  }
  //5-Fields
  fields(){
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}