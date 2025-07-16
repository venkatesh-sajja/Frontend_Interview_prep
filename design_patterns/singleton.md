Singleton Design Pattern
singleton Design Pattern ensures that only one instance is created for a class/object thorughtout the application 
eventhough we have created multiple instances of a class/object ,but variables always refer to the sinlge instance throughout the lifecycle
for example i have used context api in the react for creating and sharing the common state thoughout the application

one of the best example of singleton is Redux, global state management.

example 

class SettingsMaster{
    constructor(){
        if(SettingsMaster.instance){
            return SettingsMaster.instance // need to return the instance from the constuctor if exists
        }
        // if not set the instance and assign it to SettingsMaster.instance and then return this
        this.settings = {
            theme:"dark"
        }
        SettingsMaster.instance = this;
        // Return the instance
        return this;
    }
    setTheme(value){
        this.settings.theme = value
    }
    getTheme(){
        return this.settings
    }

}
const myTheme = new SettingsMaster()
console.log(myTheme.getTheme())
const myTheme2 = new SettingsMaster()
myTheme2.setTheme("normal")
//now we get the theme from both variables we will get normal
console.log(myTheme.getTheme()) //normal
console.log(myTheme2.getTheme()) //normal

//normal object 
const themeSettings = (function(){
    let instance
    function createInstance(){
        let settings = {
            theme:"dark"
        }
        return{
            setTheme:function(value){
                settings.theme = value
            },
            getTheme:function(){
                return settings.theme
            }
        }
    }
    return{
        createSettings:function(){
            if(instance)
                return instance
            instance = createInstance()
            return instance
        }
    }

})()
const inst1 = themeSettings.createSettings()
console.log(inst1.getTheme())
console.log(inst1.setTheme("light"))
const inst2 = themeSettings.createSettings()
console.log(inst2.getTheme())
console.log(inst2.setTheme("checking"))
console.log(inst1.getTheme())
console.log(inst2.getTheme())





