/// Module: yield_terminal
module yield_terminal::yield_terminal {
    use sui::event;
    use std::string::{ String };
    use sui::table::{Self, Table};

    const EINDEX_OUT_OF_BOUNDS: u64 = 0;

    public struct AdminCap has key {
        id: UID
    }

    public struct Account has key {
        id: UID,
        poolId: u64,
        address: address,
        accessKey: String
    }

    public struct ActionMessage has store, drop, copy {
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

    public fun remove_account(account: Account) {
        let Account {
            id,
            poolId: _,
            address: _,
            accessKey: _,
        } = account;
        object::delete(id);
    }

    public fun queue_front(queue: &MessageQueue): u64 {
        queue.front
    }

    public fun queue_back(queue: &MessageQueue): u64 {
        queue.back
    }

    public fun peek_action(queue: &mut MessageQueue, i: u64): &ActionMessage {
        if (i < queue.front || i >= queue.back) {
            abort EINDEX_OUT_OF_BOUNDS
        };

        table::borrow(&queue.table, i)
    }

    public fun peek_action_from(queue: &MessageQueue, from: u64): vector<ActionMessage> {
        let mut actions = vector::empty<ActionMessage>();
        let mut i = from;

        while (i < queue.back) {
            let action_ref = table::borrow(&queue.table, i);
            let action = *action_ref;
            vector::push_back(&mut actions, action);
            i = i + 1;
        };

        actions
    }

    public entry fun push_action(
        queue: &mut MessageQueue,
        action: u64,
        data: Option<String>,
        ctx: &mut TxContext
    ) {
        let actionMessage = ActionMessage {
            action,
            data,
            index: queue.back,
            owner: ctx.sender(),
        };
        table::add(&mut queue.table, queue.back, actionMessage);
        queue.back = queue.back + 1;
        event::emit(actionMessage);
    }

    public entry fun reset_queue_until(
        _adminCap: &AdminCap,
        queue: &mut MessageQueue,
        until: u64,
    ) {
        let mut i = queue.front;
        while (i < until) {
            table::remove(&mut queue.table, i);
            i = i + 1;
        };
        queue.front = until;
    }
}
