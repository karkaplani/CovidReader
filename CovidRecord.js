/**
 * @author Abdullah Ilgun (Apo)
 * Simple class to create data transfer objects to store several columns of the records in Covid dataset. 
 * Includes a simple constructor, and a display method.
 */
module.exports = class CovidRecord {

    constructor(
        pruid,
        prname,
        prnameFR,
        date,
        numconf,
        numprob,
        numdeaths,
        numtotal,
        numtoday,
    ) {
        this.pruid = pruid;
        this.prname = prname;
        this.prnameFR = prnameFR;
        this.date = date;
        this.numconf = numconf;
        this.numprob = numprob;
        this.numdeaths = numdeaths;
        this.numtotal = numtotal;
        this.numtoday= numtoday;
    }

    /**
     * Just to see the objects in the console for testing purposes, nothing
     * to do with the actual web app. 
     * @returns the column names and their values
     */
    displayValues() {

        var result = "\nPruID: " + this.pruid + 
                     "\nPrName: " + this.prname + 
                     "\nPrNameFr: " + this.prnameFR + 
                     "\nDate: " + this.date + 
                     "\nNumConf: " + this.numconf +
                     "\nNumProb: " + this.numprob +
                     "\nNumDeaths: " + this.numdeaths +
                     "\nNumTotal: " + this.numtotal + 
                     "\nNumToday: " + this.numtoday;

        console.log(result); 
    }
}