import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    //get the principal fr0m dfx identity get-principal
    //convert the text into Principal
    var owner : Principal = Principal.fromText("4snti-x4tyi-qz52y-4acvm-qimyd-ii6j4-ys3gt-qa267-sgzms-hd6l5-pae");
    //create total supply of one billion
    var totalSupply : Nat = 1000000000;
    //create token symbol
    var symbol : Text = "DENG";

    //create a ledger
    //class HashMap<K, V>(initCapacity : Nat, keyEq : (K, K) -> Bool, keyHash : K -> Hash.Hash)
    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    //add the owner to this ledger as the first entry
    balances.put(owner, totalSupply);

    //make a query to find out how much balance is a particular person (id) own
        //func get(key : K) : (value : ?V) 
        // if (balances.get(who) == null){
        //     return 0;
        // } else {
        //     return balances.get(who)
        // }
    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };
        return balance;
    };
    
    public query func getSymbol() : async Text {
        return symbol;
    };

    //shared(msg) func inc() : async() {//msg.caller} - identify the principal id of a person who call this function 
    public shared(msg) func payOut() : async Text {
        //log to see the principal id of the caller
        Debug.print(debug_show (msg.caller));

        //1. check if this person has already claimed the tokens with get method (if principal doesn't exist, return null)
        if (balances.get(msg.caller) == null) {
        //2. give 10,000 MooDeng tokens to that user
            let amount =  10000;
            balances.put(msg.caller, amount);
            return "Success";
        // 3. if its the same user
        } else {
            return "Already Claimed";
        }
    };
    
    //only pass "to" account and the "amount"
    //whoever trigger this function is the "from" (msg.caller)
    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text {
        //1. check the balance of that person
        let fromBalance = await balanceOf(msg.caller);
        //2. if there's enough money to transfer from the account
        if (fromBalance > amount) {
            //3. remove the transfer amount of out Account A
            let newFromBalace : Nat = fromBalance - amount;
            //4. update Account A balance
            balances.put(msg.caller, newFromBalace);

            //add that transfer amount to Account B process
            //5. check the balance of Account B from what user paste in the input
            let toBalance = await balanceOf(to);
            //6. add that transfer amount to Account B 
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);
            return "Success"
        } else {
            return "Insufficient fund"
        }
    }
}