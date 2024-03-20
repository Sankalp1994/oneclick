public with sharing class mcc_doc_ctrl {
    public List<Opportunity> oppList {get;set;}
    public String currentRecordId {get;set;}
    public String textValue {get;set;}
    public mcc_doc_ctrl() {
        currentRecordId  = ApexPages.CurrentPage().getparameters().get('id');
        textValue  = ApexPages.CurrentPage().getparameters().get('textValue');
        oppList = [SELECT MainCompetitors__c,TrackingNumber__c,
                    OrderNumber__c,Description,closeDate,Amount 
                     FROM Opportunity WHERE AccountId = :currentRecordId];
    }
    @AuraEnabled
    public static Blob uploadAction(String recordId){
        Blob file = null;
        try {
            
            PageReference PDf =  Page.mcc_doc;//Replace attachmentPDf with the page you have rendered as PDF
            PDf.getParameters().put('Id',recordId);
            PDf.setRedirect(true);
            Attachment attach = new Attachment();
            Blob b ;
            b = PDf.getContent();
            attach.Body = b;
            attach.Name = 'Mcc Document_'+system.now()+'.pdf';
            attach.IsPrivate = false;
            attach.ParentId = recordId;
            insert attach;


            


            file = PDf.getContent();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return file;
    }
}
