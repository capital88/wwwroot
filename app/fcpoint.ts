/* * * ./app/comments/model/comment.ts * * */
export class Fcpoint {
        
        // BUY
        public buy: jobt[] = [];
        // SELL
        public sell: jobt[] = [];
        // DATA
        public data: number[][] = [];
        // X
     
    }
    export class jobt {    
       
        public x: number = 0;
        // TITLE
        public title: string = null;
    }
     //sum
      export class Fund {    
       
        public datas: funit[] = [];
        // CATEGORIES
        public categories: number[] = [];
    }
     export class funit {    
       
            public name: string = null;
        // DATA
        public data: number[] = [];
    }
      export class Todo {    
       
       public text: string = null;
        // DONE
        public done: string = null;
    }
      export class Info {    
       
       public text: string = null;
        // DONE
        public done: string = null;
    }
    //柱
     export class Jsonday {    
       
        public name: string = null;
       public data: number[] = [];
        // CATEGORIES
        public categories: number[] = [];
    }