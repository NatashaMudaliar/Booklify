export interface Book { id:string; title:string; author:string; price:number; genre:string; emoji:string; description:string; stock:number; }
export interface User { name:string; email:string; token:string; }
export interface CartItem { book:Book; quantity:number; }
export interface Order { id:string; customerName:string; email:string; items:{bookId:string;title:string;price:number;quantity:number}[]; subtotal:number; delivery:number; total:number; createdAt:string; status:string; }
