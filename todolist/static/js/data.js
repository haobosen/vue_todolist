export default {
    getData: function(){
        var data = JSON.parse(window.localStorage.getItem("toDoListData" || '[]' ));
        if(data == null){
            return [];
        }else{
            return data;
        }   
        
    },
    store: function(data){
        localStorage.setItem("toDoListData",JSON.stringify(data));
    }
}