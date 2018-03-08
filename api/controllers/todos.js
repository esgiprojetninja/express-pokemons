const all = ctx => {
    const todos = [{ id: "ijustwannapoulayman", title: "PoulayMan", status: "done" }];
    ctx.ok({ todos });
};

module.exports = {
    all
};
