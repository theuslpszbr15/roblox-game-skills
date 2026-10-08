-- Local test bridge: forwards Output to 127.0.0.1 and runs queued test snippets.
local HttpService = game:GetService('HttpService')
local RunService = game:GetService('RunService')
local LogService = game:GetService('LogService')
local ctx = 'edit'
if RunService:IsRunning() then ctx = RunService:IsClient() and 'client' or 'server' end
if ctx == 'edit' and RunService:IsRunMode() then ctx = 'server' end
local base = 'http://127.0.0.1:38741'
local buffer = {}
LogService.MessageOut:Connect(function(message, kind)
    if #buffer < 400 and not string.find(message, '38741', 1, true) then table.insert(buffer, {kind.Name, message}) end
end)

local function execute(code)
    local fn, err
    local ok = pcall(function() fn, err = loadstring(code) end)
    if not ok or not fn then
        if err then return false, 'compile: ' .. tostring(err) end
        local module = Instance.new('ModuleScript')
        module.Source = 'return function() ' .. code .. '\nend'
        local loaded, value = pcall(require, module)
        if not loaded then return false, 'module: ' .. tostring(value) end
        fn = value
    end
    local packed = table.pack(pcall(fn))
    local out = {}
    for index = 2, packed.n do table.insert(out, tostring(packed[index])) end
    return packed[1], table.concat(out, ' | ')
end

task.spawn(function()
    while true do
        local outgoing = buffer
        buffer = {}
        local ok, response = pcall(function()
            return HttpService:RequestAsync({Url = base .. '/poll?ctx=' .. ctx, Method = 'POST', Body = HttpService:JSONEncode(outgoing), Headers = {['Content-Type'] = 'application/json'}})
        end)
        if ok and response.Success then
            local job = HttpService:JSONDecode(response.Body)
            if job.id then
                local success, value = execute(job.code)
                pcall(function()
                    HttpService:RequestAsync({Url = base .. '/result?ctx=' .. ctx, Method = 'POST', Body = HttpService:JSONEncode({id = job.id, ok = success, value = value}), Headers = {['Content-Type'] = 'application/json'}})
                end)
            end
            task.wait(0.15)
        else
            task.wait(2)
        end
    end
end)
