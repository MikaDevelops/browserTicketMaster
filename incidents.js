/*
DONE->TODO: mickeys coffee and coke in the keyboard -> should take both rows to the description.
TODO: list all cases to page.
TODO: sort the cases using customer id (sortByCustomerNumber method).
*/

class IncidentHandler{
    
    incidents = [];
    /*  
        incident_number: null,
        customer_name: null,
        incident_state: null,
        subject: null,
        description: null,
        solution: null,
        related_incidents: null,
        is_related: false
        customer_id: null,
    */

    async loadDataFromFile(file, type){
        let textFromFile = await file.text();
        switch(type){
            case "new":
                this.#makeIncidentObject(textFromFile);
                this.updateAllIncidentsToView();
                document.getElementById('incident_file').hidden=true;
                document.getElementById('label_new_incidents').hidden=true;
                break;
            case "db":
                break;
            default:
                throw new Error("File type incorrect!");
                break;
        }
        
        
        document.getElementById('incident_file').hidden=true;
    }
    updateAllIncidentsToView(){
        let container = document.getElementById('incidentlist');
        for (let incident of this.incidents){
            let row = document.createElement('div');
            row.innerHTML=`${incident.incident_number} subject: ${incident.subject} name: ${incident.customer_name}`;
            container.appendChild(row);
        }
    }
    indexSortedByCustomerNumber(){
        if(!this.incidents || this.incidents.length == 0) return null;
        let sortedByCustomerNumber = {}
        for (let i=0; i<this.incidents.length; i++){
            let customer = this.incidents[i].customer_id;
            let inc_num = this.incidents[i].incident_number;
            if(customer in sortedByCustomerNumber){
                sortedByCustomerNumber[customer].push(this.incidents[i].incident_number);
            }
            else{
                sortedByCustomerNumber[customer] = [];
                sortedByCustomerNumber[customer].push({customer: inc_num})
            }
        }
        return sortedByCustomerNumber;
    }
    loadDataFromLocalStorage(){

    }
    saveDataToLocalStorage(){
        
    }
    saveDataToFile(){

    }
    #makeIncidentObject(incidentsText){
        function makeObject(incidentText){

            let incidentObject = {};

            let incidentNumStart = incidentText.indexOf(":")+1;
            let incidentNumEnd = incidentText.indexOf('\n',incidentNumStart);
            incidentObject.incident_number = incidentText.slice(incidentNumStart, incidentNumEnd).trim();

            let customerIdStart = incidentText.indexOf(':', incidentNumEnd)+1;
            let customerIdEnd = incidentText.indexOf('\n', customerIdStart);
            incidentObject.customer_id = incidentText.slice(customerIdStart, customerIdEnd).trim();

            let customerNameStart = incidentText.indexOf(':', customerIdEnd)+1;
            let customerNameEnd = incidentText.indexOf('\n', customerNameStart);
            incidentObject.customer_name = incidentText.slice(customerNameStart, customerNameEnd).trim();

            let subjectStart = incidentText.indexOf(':', customerNameEnd)+1;
            let subjectEnd = incidentText.indexOf('\n', subjectStart);
            incidentObject.subject = incidentText.slice(subjectStart, subjectEnd).trim();

            let descriptionStart = incidentText.indexOf(':', subjectEnd)+1;
            incidentObject.description = incidentText.slice(descriptionStart).trim();

            return incidentObject;
        }
        let incidentStartIndexes = this.#findStartIndexes(incidentsText);
        let incidentLength = incidentStartIndexes.length;
        if (incidentLength < 1) alert('No incidents in file!');
        for (let i=0; i < incidentLength; i++){
            let incident;
            if (i < incidentLength-1){
                incident = makeObject(incidentsText.slice(incidentStartIndexes[i], incidentStartIndexes[i+1]));
            }
            else{
                incident = makeObject(incidentsText.slice(incidentStartIndexes[i]));
            }
            this.incidents.push(incident);
        }
    }
    #findStartIndexes(incidentsText){
        let indexes = [];
        function findNext(startIndex){
            let index = incidentsText.indexOf("incident_number: ", startIndex)
            if(index != -1){
                indexes.push(index);
                startIndex = index+1;
                findNext(startIndex);
            }
            else{
                return null;
            }
        }
        findNext(0);
        return indexes;
    }
}