
/// Module: yield_terminal
module yield_terminal::yield_terminal {
    use std::string::{ String };
    use sui::table::{Self, Table};

    public struct AdminCap has key {
        id: UID
    }

    public struct Account has key {
        id: UID,
        poolId: u64,
        address: address,
        accessKey: String
    }

    public struct ActionMessage has store {
        index: u64,
        action: u64,
        owner: address,
        data: Option<String>,
    }

    public struct MessageQueue has key {
        id: UID,
        table: Table<u64, ActionMessage>,
        front: u64,
        back: u64,
    }

    fun init(ctx: &mut TxContext) {
        transfer::transfer(
            AdminCap {id: object::new(ctx)},
            ctx.sender()
        );

        transfer::share_object(
            MessageQueue {
                id: object::new(ctx),
                table: table::new<u64, ActionMessage>(ctx),
                front: 0,
                back: 0,
            }
        )
    }

    public fun backup_account(
        poolId: u64,
        address: address,
        accessKey: String,
        ctx: &mut TxContext
    ) {
        transfer::transfer(
            Account {
                id: object::new(ctx),
                poolId,
                address,
                accessKey
            },
            ctx.sender()
        );
    }

    public fun reset_account(account: Account) {
        let Account {
            id,
            poolId: _,
            address: _,
            accessKey: _,
        } = account;
        object::delete(id);
    }

    public entry fun enqueue(
        queue: &mut MessageQueue,
        action: u64,
        data: Option<String>,
        ctx: &mut TxContext
    ) {
        table::add(
            &mut queue.table,
            queue.back,
            ActionMessage {
                action,
                data,
                index: queue.back,
                owner: ctx.sender(),
            }
        );
        queue.back = queue.back + 1;
    }
}
